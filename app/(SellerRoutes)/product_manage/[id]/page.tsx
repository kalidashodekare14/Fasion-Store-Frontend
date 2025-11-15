import ProductEditComponent from '@/components/pages/SellterComponents/ProductEditComponent';
import { Box } from '@chakra-ui/react';


const page = () => {
    return (
        <Box gap={3} lg={{ px: "5%", py: "2%" }} >
            <ProductEditComponent />
        </Box>
    );
};

export default page;