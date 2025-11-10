import ShopComponent from '@/components/pages/ShopComponent/ShopComponent';
import { Box } from '@chakra-ui/react';

const ShopPage = () => {
    return (
        <Box gap={3} lg={{ mx: "5%", my: "2%" }} >
            <ShopComponent />
        </Box>
    );
};

export default ShopPage;