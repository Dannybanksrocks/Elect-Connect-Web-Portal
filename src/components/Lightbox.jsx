import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";

const LightboxComponent = ({ slides, open, handleClose }) => {
  const lightboxslides = slides?.map((img) => {
    return { src: img };
  });

  return (
    <Lightbox
      carousel={{ imageFit: "contain" }}
      slides={lightboxslides}
      open={open}
      close={handleClose}
      plugins={[Fullscreen, Thumbnails, Zoom, Counter]}
      counter={{ container: { style: { top: 0 } } }}
    />
  );
};

export default LightboxComponent;
