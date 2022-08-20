// Component elements
import AddReviews from './add.reviews';
import UpdateReviews from './update.reviews';
import ViewReviews from './view.reviews';
// Interface elements
import { ModalType } from '../../data';

interface IndexReviewsProps {
  modal: ModalType
  closeMethod: () => void,
}

const IndexReviews: React.FC<IndexReviewsProps> = ({ modal, closeMethod }) => {
  switch (modal) {
    case ModalType.VIEW:
      return <ViewReviews closeMethod={closeMethod} />;
    case ModalType.UPDATE:
      return <UpdateReviews closeMethod={closeMethod} />;
    case ModalType.ADD:
      return <AddReviews closeMethod={closeMethod} />;
    default:
      return null;
  }
}

export default IndexReviews