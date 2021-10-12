import { Fragment } from "react";
import {
  Box,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";

const InputBox: React.FC<{
  id: string;
  label: string;
  value?: string;
  onChange: React.Dispatch<React.SetStateAction<string | null>>;
  isRequired: boolean;
  isInvalid: boolean;
  error: any;
}> = ({ id, label, value, onChange, isRequired, isInvalid, error }) => {
  
  return (
    <Fragment>
      <FormControl id={id} isRequired={isRequired} isInvalid={isInvalid}>
        <HStack mt={4}>
          <FormLabel w="40%" fontSize="13px" color="GrayText">
            {label}
          </FormLabel>
          <Box w="full">
            <Input
              color="GrayText"
              fontSize={13}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              _focus={{ outline: "none" }}
            />
          </Box>
        </HStack>
        <HStack spacing={5}>
          <Box w="40%"></Box>
          <Box w="full">
            <FormErrorMessage>{error}</FormErrorMessage>
          </Box>
        </HStack>
      </FormControl>
    </Fragment>
  );
};

export default InputBox;
