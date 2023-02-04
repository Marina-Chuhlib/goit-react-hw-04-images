import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeModal, alt, src }) => {
  

const oncloseModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => window.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  // const {currentImage: { alt, src }} = this.props;

  return createPortal(
    <div className={css.overlay} onClick={oncloseModal}>
      <div className={css.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.closeModal);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.closeModal);
//   }

//   closeModal = ({ target, currentTarget, code }) => {
//     if (target === currentTarget || code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   render() {
//     const { closeModal } = this;
//     const {
//       currentImage: { alt, src },
//     } = this.props;

//     return createPortal(
//       <div className={css.overlay} onClick={closeModal}>
//         <div className={css.modal}>
//           <img src={src} alt={alt} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }
