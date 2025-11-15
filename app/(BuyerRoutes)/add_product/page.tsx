import ProductPostComponent from "@/components/pages/SellterComponents/ProductPostComponent";
import { Box } from "@chakra-ui/react";


const AddProduct = () => {
    return (
        <Box lg={{ mx: "5%", my: "5%" }}>
            <ProductPostComponent />
        </Box>
    );
};

export default AddProduct;