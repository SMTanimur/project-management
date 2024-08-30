"use client";

import CreateBotflowForm from "@/components/form/create-botflow";

import { Modal } from "@/components/ui/modal";
import { useGlobalModalStateStore } from "@/store/modal";


const GlobalModals = () => {
  const globalModal = useGlobalModalStateStore((state) => state);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div className="">
      
     
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
