"use client";

import { RenderSwitchForm } from "@/components/botflows/form";
import CreateBotflowForm from "@/components/form/create-botflow";
import { Icons } from "@/components/ui/icons";

import { Modal } from "@/components/ui/modal";
import { useBotPropertyStore } from "@/store/botfllow";
import { useGlobalModalStateStore } from "@/store/modal";


const GlobalModals = () => {
  const globalModal = useGlobalModalStateStore((state) => state);
  const {
    botNodeData,
    setShowBotProperty,
    showBotProperty
  } = useBotPropertyStore();
  const Icon = Icons[botNodeData?.data?.icon ?? "address"];
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div className="">
      
     
      <Modal
        size="md"
        title="Create a new bot"
        isAnimated={true}
        animationType="animate__fadeIn"
        show={globalModal.botflowModalIsOpen}
        onClose={() => globalModal.setBotflowModal(false)}
      >
        <CreateBotflowForm />
      </Modal>
      
      <Modal
        size="md"
        title={botNodeData?.data?.label}
        icon={ <Icon className='size-5' />}
        isAnimated={true}
        animationType="animate__fadeInUp"
        show={showBotProperty}
        onClose={() => setShowBotProperty(false)}
      >
        { botNodeData && <RenderSwitchForm  />}
      </Modal>
    </div>
  );
};

export default GlobalModals;
