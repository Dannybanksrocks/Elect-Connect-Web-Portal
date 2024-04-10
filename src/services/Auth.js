import AxiosInstance from "./AxiosInstance";

export default class AuthService {
  async login(payload) {
    let errors = [];
    let data = null;
    const url = "/api/supervisor/requestotp";
    try {
      const response = (await AxiosInstance().post(url, payload)).data;
      if (response.result) {
        data = response;
      } else {
        errors.push(true);
      }
    } catch (error) {
      errors.push(error);
    }
    return {
      errors,
      data,
    };
  }

  async verifyOtp(payload) {
    let errors = [];
    const url = "/api/supervisor/verifyotp";
    try {
      const response = (await AxiosInstance().post(url, payload)).data;
      if (!response.succeeded) {
        errors.push(true);
      }
    } catch (error) {
      errors.push(error);
    }
    return {
      errors,
    };
  }
}