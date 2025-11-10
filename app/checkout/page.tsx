import CheckoutComponent from "@/components/pages/ShopComponent/CheckoutComponent";
import { Box } from "@chakra-ui/react";


const CheckoutPage = () => {
    return (
        <Box lg={{mx: "5%", my: "5%"}}>
            <CheckoutComponent />
        </Box>
    );
};

export default CheckoutPage;