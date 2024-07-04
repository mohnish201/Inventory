import { Heading, VStack, Button } from "@chakra-ui/react";
import { ImBlocked } from "react-icons/im";


const Unauthorized = () => {
    return (
        <VStack pt={'10vh'}>
            <ImBlocked fontSize={48} color="red" />
            <Heading fontSize={24} maxW={350} textAlign={'center'}> You are not authorized to access this page </Heading>
            <Button my={4} variant={'outline'}> Contact Administration </Button>
        </VStack>
    )
}

export { Unauthorized }
