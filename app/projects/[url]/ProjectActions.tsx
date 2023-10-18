import { Button, Flex } from "@radix-ui/themes";
import { AiOutlineEdit, AiOutlineCloseCircle } from "react-icons/ai";

const ProjectActions = () => {
  return (
    <Flex gap="2">
      <Button size="1" color="cyan">
        <AiOutlineEdit /> Edit Project
      </Button>
      <Button size="1" color="red">
        <AiOutlineCloseCircle /> Delete Project
      </Button>
    </Flex>
  );
};

export default ProjectActions;
