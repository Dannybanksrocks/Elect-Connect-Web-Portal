import "../styles/Home.css";
import logo from "../assets/logo.png";
import TextField from "../components/TextField";
import { Box } from "@mui/material";
import { useState } from "react";
import Button from "../components/Button";
import AuthService from "../services/Auth";
import Note from "../components/Note";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { useDispatch } from "react-redux";
import { sessionInit } from "../redux/features/Session";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import OtpInput from "react-otp-input";
import { BeatLoader as Spinning } from "react-spinners";

const Home = () => {
  const otpLength = 6;
  const [tempSession, setTempSession] = useState(null);
  const [otp, setOtp] = useState(null);
  const [otpRequestLoading, setOtpRequestLoading] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const handleChangeOtp = (input) => {
    setOtp(input);
    if (input.length === otpLength) {
      handleSubmitOtp(input);
    }
  };
  const handleSubmitOtp = async (input) => {
    setOtpRequestLoading(true);
    try {
      const authService = new AuthService();
      const { errors } = await authService.verifyOtp({
        msisdn: payload.msisdn,
        otp: input,
      });
      if (errors.length === 0) {
        setOtpError(false);
        dispatch(sessionInit(tempSession));
        navigate("/portal/dashboard", { replace: true });
      } else {
        setOtpError(true);
      }
    } catch (error) {
      setOtpError(true);
    }
    setOtpRequestLoading(false);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOtp(null);
    setOtpError(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [payload, setPayload] = useState({
    msisdn: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const authService = new AuthService();
    try {
      const { errors, data } = await authService.login(payload);
      if (errors.length === 0) {
        setTempSession(data);
        handleOpen();
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
    setPayload({ ...payload, password: "" });
    setLoading(false);
  };
  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  return (
    <div className="home-page">
      <div className="home-page-inner">
        <Section className="home-disclaimer">
          <Note
            message={
              <div>
                Disclaimer: The results set through the system only serve as
                provisional results. The Final Results are only announced by the
                Elections Commissioner of NEC (National Elections Commision)
              </div>
            }
          />
        </Section>

        <div className="home-page-logo">
          <div className="home-page-logo-image">
            <img src={logo} alt="" />
          </div>
        </div>

        <Box
          onSubmit={login}
          component={"form"}
          className="home-page-form-container"
        >
          <div className="home-page-form-title">
            <div>ElectConnect</div>
            <div>Data Collection Solution</div>
          </div>

          <div className="input-controllers">
            <div className="input-controller">
              <TextField
                required
                onChange={handleChange}
                name={"msisdn"}
                type={"text"}
                placeholder={"Enter MSISDN"}
                error={error}
                value={payload.msisdn}
              />
            </div>
            <div className="input-controller">
              <TextField
                required
                onChange={handleChange}
                name={"password"}
                type={"password"}
                placeholder={"Enter Access Key"}
                error={error}
                value={payload.password}
                helperText={
                  error ? (
                    <div style={{ fontWeight: 600 }}>
                      Invalid MSISDN or Password
                    </div>
                  ) : (
                    ""
                  )
                }
              />
            </div>
          </div>

          <div>
            <Button
              fullWidth
              loading={loading}
              type={"submit"}
              label={"Submit"}
              variant={"contained"}
            />
          </div>
        </Box>
      </div>

      <Footer />

      <Modal open={open} onClose={handleClose}>
        <div className="otp">
          <div className="otp-inner">
            <div>
              <strong>Tech 231 Liberia Limited.</strong>
            </div>
            <div className="otp-header">
              <div className="otp-title">Verify With OTP</div>
              <div className="otp-title-helper">
                To ensure security, please enter the One-Time Password (OTP)
                sent to{" "}
                <span style={{ fontWeight: 600 }}>+{payload.msisdn}</span>
              </div>
            </div>
            <Box component={"form"} className="otp-form">
              <div className="otp-input-container">
                <OtpInput
                  numInputs={otpLength}
                  shouldAutoFocus={true}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={otpError ? "otp-input-error" : "otp-input"}
                  onChange={handleChangeOtp}
                  value={otp}
                />
              </div>
              {otpRequestLoading ? (
                <div className="otp-input-loading">
                  <div>
                    <Spinning color="gray" size={7} />
                  </div>
                </div>
              ) : (
                otpError && (
                  <div className="otp-input-error-text">
                    You entered a wrong OTP, try again
                  </div>
                )
              )}
            </Box>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
