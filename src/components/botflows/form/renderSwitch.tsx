import { useBotPropertyStore } from '@/store/botfllow';
import { NodeType } from '@/types';
import TriggerForm from './trigger-form';
import FileGenerateForm from './file-generate-form';
import TextToJsonForm from './text-to-json-form';
import GenerativeAIForm from './generative-ai-form';
import SendEmailForm from './send-email-form';
import ConditionNodeForm from './condition-form';
import TimerNodeForm from './timer-form';
interface IProps{
  onCloseModal:()=>void;
}
export const RenderSwitchForm = ({ onCloseModal }: IProps) => {
  const { botNodeData } = useBotPropertyStore();
  switch (botNodeData?.type) {
    case NodeType.TRIGGER:
      return <TriggerForm onCloseModal={onCloseModal} />;
    case NodeType.FILEGENARATOR:
      return <FileGenerateForm onCloseModal={onCloseModal}/>;
    case NodeType.TEXTTOJSON:
      return <TextToJsonForm onCloseModal={onCloseModal}/>;
    case NodeType.GENERATIVEAI:
      return <GenerativeAIForm onCloseModal={onCloseModal}/>;
    case NodeType.SENDEMAIL:
      return <SendEmailForm onCloseModal={onCloseModal}/>;
    case NodeType.TIMER:
      return <TimerNodeForm onCloseModal={onCloseModal}/>;

    case NodeType.CONDITION:
      return <ConditionNodeForm onCloseModal={onCloseModal}/>;

    default:
      return <TriggerForm onCloseModal={onCloseModal}/>;
  }
};
