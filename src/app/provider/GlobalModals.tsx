"use client";

import CreateBotflowForm from "@/components/form/create-botflow";
import CreateWorkflowForm from "@/components/form/create-workflow";
import { Modal } from "@/components/ui/modal";
import { useGlobalModalStateStore } from "@/store/modal";


const GlobalModals = () => {
  const globalModal = useGlobalModalStateStore((state) => state);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div className="p-3">
      
      <Modal
        size="md"
        title="Write a review"
        isAnimated={true}
        animationType="animate__fadeIn"
        show={globalModal.openModal}
        onClose={() => globalModal.oncloseModal()}
      >
        <CreateWorkflowForm />
      </Modal>
      <Modal
        size="md"
        title="Write a review"
        isAnimated={true}
        animationType="animate__fadeIn"
        show={globalModal.botflowModalIsOpen}
        onClose={() => globalModal.setBotflowModal(false)}
      >
        <CreateBotflowForm />
      </Modal>
    </div>
  );
};

export default GlobalModals;
