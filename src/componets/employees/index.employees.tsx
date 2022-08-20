// Component elements
import AddEmployees from './add.employees';
import UpdateEmployees from './update.employees';
import ViewEmployees from './view.employees';
// Interface elements
import { ModalType } from '../../data';

interface IndexEmployeesProps {
  modal: ModalType
  closeMethod: () => void,
}

const IndexEmployees: React.FC<IndexEmployeesProps> = ({ modal, closeMethod }) => {
  switch (modal) {
    case ModalType.VIEW:
      return <ViewEmployees closeMethod={closeMethod} />;
    case ModalType.UPDATE:
      return <UpdateEmployees closeMethod={closeMethod} />;
    case ModalType.ADD:
      return <AddEmployees closeMethod={closeMethod} />;
    default:
      return null;
  }
}

export default IndexEmployees