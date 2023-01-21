import HystModal from 'hystmodal';
import 'hystmodal/dist/hystmodal.min.css';

const myModal = new HystModal({
  linkAttributeName: 'data-hystmodal',
  closeOnButton: true,
});

function onClick() {
  myModal.init();
}
