import ProductManageComponent from '@/components/pages/SellterComponents/ProductManageComponent';
import { Box } from '@chakra-ui/react';

const ProductManage = () => {
    return (
        <Box gap={3} lg={{ px: "5%", py: "2%" }} backgroundColor={"#bbbb"}>
            <ProductManageComponent />
        </Box>
    );
};

export default ProductManage;