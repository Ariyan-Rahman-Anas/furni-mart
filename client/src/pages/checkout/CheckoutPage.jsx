import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { usePayWithSSLMutation } from "@/redux/apis/paymentApi";
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK";

const CheckoutPage = () => {
    const user = useSelector(state=>state?.auth?.user)
    const location = useLocation()
    const cartItems = location?.state?.cartItems;
    const discount = location.state?.discount;
    const subtotal = location.state?.total;
    const finalTotal = location.state?.finalTotal;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm();

    const [payWithSSL, { data, isSuccess, isLoading, error }] = usePayWithSSLMutation()

    const handleSSLPayment = async (formData) => {
        const dataFromCheckoutForm = {
            billingInfo: { userId: user._id },
            shippingInfo: formData.shippingInfo,
            orderedItems: cartItems,
            discount,
            subtotal,
            total: finalTotal,
            status: "Pending",
            currency: "BDT",
        }
        payWithSSL(dataFromCheckoutForm)
    }

    const proceedToPaymentHandler = () => {
        // Check for required fields
        const requiredFields = [
            'billingInfo.userId.name',
            'billingInfo.userId.email',
            'shippingInfo.address',
            'shippingInfo.city',
            'shippingInfo.state',
            'shippingInfo.zipCode',
            'shippingInfo.country',
            'shippingInfo.mobile',
        ];

        // Check for errors
        let hasError = false;

        requiredFields.forEach((field) => {
            const fieldErrors = errors[field];
            if (!fieldErrors) {
                clearErrors(field); // Clear previous error if exists
            } else {
                hasError = true; // Set flag if there's an error
                setError(field, { type: "manual", message: fieldErrors.message || "This field is required" });
            }
        });

        // Show toast message if any required field is missing
        if (hasError) {
            toast.error("Please fulfill all the shipping info properly"); // Show single toast message
        } else {
            handleSubmit(handleSSLPayment)(); // Proceed with form submission if no errors
        }
    };

    if (data?.url) {
        window.location.replace(data.url)
    }

    return (
        <div className="px-2 pt-8 pb-12 w-full md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-7 gap-6 ">
            {/* Main Form Section */}
            <main className="col-span-7 md:col-span-5">
                <form id="checkout-form" className="space-y-6 "
            // onSubmit={handleSubmit(submitHandler)}
            onSubmit={handleSubmit(handleSSLPayment)}
            >
                    <Card className="p-4 space-y-4">
                        <h1 className="mb-3 font-semibold text-lg">Billing Information</h1>
                        <div className="flex flex-col md:flex-row gap-4 w-full ">
                            <div className="flex flex-col w-full gap-1 ">
                                <label htmlFor="billingInfo.userId.name" className="text-sm">Name</label>
                                <Input
                                    type="text"
                                    placeholder="John Doe"
                                    className="text-Input"
                                defaultValue={user?.name}
                                    {...register("billingInfo.userId.name", { required: "Name is required" })}
                                />
                                {/* {errors.billingInfo?.userId?.name && <span className="text-myRed font-semibold">{errors.billingInfo.userId?.name.message}</span>} */}
                            </div>
                            <div className="flex flex-col w-full gap-1 ">
                                <label htmlFor="billingInfo.userId.email" className="text-sm">Email</label>
                                <Input
                                    type="email"
                                    placeholder="example@doe.com"
                                    defaultValue={user?.email}
                                    readOnly
                                    className="text-Input"
                                    {...register("billingInfo.userId.email", { required: "Email is required" })}
                                />
                                {/* {errors.billingInfo?.userId?.email && <span className="text-myRed font-semibold">{errors.billingInfo.userId?.email.message}</span>} */}
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor="billingInfo.additionalInfo" className="text-sm">Additional Information</label>
                            <Input
                                type="text"
                                placeholder="Gift message, Special delivery, Instructions, etc."
                                className="text-Input"
                                {...register("billingInfo.anyMessage")}
                            />
                            {/* {errors.billingInfo?.anyMessage && <span className="text-myRed font-semibold">{errors.billingInfo?.anyMessage.message}</span>} */}
                        </div>
                    </Card>

                    <Card className="p-4 space-y-4">
                        <h1 className="mb-3 font-semibold text-lg ">Shipping Information</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="shippingInfo.address" className="text-sm">Address</label>
                                <Input
                                    type="text"
                                    placeholder="e.g. Khulshi, Nasirabad, Chattogram"
                                    className="text-Input"
                                    {...register("shippingInfo.address", { required: "Address is required" })}
                                />
                                {errors.shippingInfo?.address && <span className="text-myRed font-semibold">{errors.shippingInfo?.address.message}</span>}
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="shippingInfo.city" className="text-sm">City</label>
                                <Input
                                    type="text"
                                    placeholder="e.g. Chattogram"
                                    className="text-Input"
                                    {...register("shippingInfo.city", { required: "City is required" })}
                                />
                                {errors.shippingInfo?.city && <span className="text-myRed font-semibold">{errors.shippingInfo?.city.message}</span>}
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="shippingInfo.state" className="text-sm">State</label>
                                <Input
                                    type="text"
                                    placeholder="e.g. Chattogram"
                                    className="text-Input"
                                    {...register("shippingInfo.state", { required: "State is required" })}
                                />
                                {errors.shippingInfo?.state && <span className="text-myRed font-semibold">{errors.shippingInfo?.state.message}</span>}
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="shippingInfo.zipCode" className="text-sm">Zip code</label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 3582"
                                    className="text-Input"
                                    {...register("shippingInfo.zipCode", { required: "Zip code is required" })}
                                />
                                {errors.shippingInfo?.zipCode && <span className="text-myRed font-semibold">{errors.shippingInfo?.zipCode.message}</span>}
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="shippingInfo.country" className="text-sm">Country</label>
                                <Input
                                    type="text"
                                    defaultValue="Bangladesh"
                                    placeholder="e.g. Bangladesh"
                                    className="text-Input"
                                    {...register("shippingInfo.country", { required: "Country is required" })}
                                />
                                {errors.shippingInfo?.country && <span className="text-myRed font-semibold">{errors.shippingInfo?.country.message}</span>}
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="shippingInfo.mobile" className="text-sm">Mobile</label>
                                <Input
                                    type="tel"
                                    placeholder="e.g. +8801610-195968"
                                    className="text-Input"
                                    {...register("shippingInfo.mobile", { required: "Mobile is required" })}
                                />
                                {errors.shippingInfo?.mobile && <span className="text-myRed font-semibold">{errors.shippingInfo?.mobile.message}</span>}
                            </div>
                        </div>
                    </Card>

                    {/* <Card className="p-4 space-y-4">
                        <h1 className="mb-3 font-semibold text-lg">Payment Method</h1>
                        <RadioGroup defaultValue="option-one">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Stripe" id="Stripe" />
                                <Label htmlFor="Stripe">Pay with Stripe</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Paypal" id="Paypal" />
                                <Label htmlFor="Paypal">Pay with Paypal</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="SSL" id="SSL" />
                                <Label htmlFor="SSL">Pay with SSL Commerz</Label>
                            </div>
                        </RadioGroup>
                    </Card> */}
                </form>
            </main>

            <Card className="section-grant col-span-7 md:col-span-2 p-4 md:p8 relative">
                <h1 className="mb-3 font-semibold text-lg">Order Summary</h1>
                {/* Order Summary Component */}
                <div className="space-y-4 mb-6 ">
                    {
                        cartItems?.map(item => <div key={item._id} className="text-sm flex items-center gap-3 " >
                            <div className="w-[4.5rem] ">
                                <img src={item.image} alt={item?.name} className="w-full h-full" />
                            </div>
                            <div>
                                <h1 className="font-semibold">{item.name} </h1>
                                <p><span>{item.quantity}</span> x <span>{item.price}</span> </p>
                            </div>
                        </div>)
                    }
                </div>

                <div className="text-sm space-y-1.5">
                    <div className="flex items-center justify-between">
                        <p>Sub-total</p>
                        <p className="font-semibold" >{subtotal}.00</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <p>Discount</p>
                        <p className="font-semibold">{discount?.toFixed(2)}.00</p>
                    </div>
                    <hr className="hr mt-3 " />
                    <div className="flex items-center justify-between font-semibold ">
                        <p>Total</p>
                        <p>{finalTotal}.00</p>
                    </div>
                </div>

                <Button
                    onClick={proceedToPaymentHandler}
                    type="submit"
                    form="checkout-form"
                    disabled={isLoading}
                    className="w-full md:w-fit mx-auto mt-8 md:absolute bottom-4 left-4 right-4">
                    {isLoading ? <>Proceed to Payment → <IsLoadingLoaderRTK /> </> : <>Proceed to Payment →</> }
                    
                </Button>
            </Card>
        </div>
    );
};
export default CheckoutPage;