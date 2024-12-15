import DateFormatter from "./DateFormatter";
import { ModularTable } from "./ModularTable";

const OrderInvoice = ({ orderDetails, orderedProducts }) => {
    const { cus_name, cus_email, cus_phone, cus_add1, cus_city, total_amount, discount_amount } =
        orderDetails?.order?.paymentInfo || {};

    const invoiceDate = new Date(Date.now());

    const columns = [
        {
            accessorKey: "name",
            header: "Product",
            cell: ({ row }) => <h1>{row.original?.name}</h1>,
        },
        {
            accessorKey: "quantity",
            header: "Quantity",
            cell: ({ row }) => <p>{row.original?.quantity}</p>,
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => <p>{row.original?.price}</p>,
        },
        {
            accessorKey: "subtotal",
            header: "Subtotal",
            cell: ({ row }) => <p>{row.original?.subtotal}</p>,
        },
    ]

    return (
        <div>
            <h1 className="text-3xl font-semibold text-center mb-6">Invoice</h1>
            <div className="flex items-center justify-between gap-4 mb-1.5">
                <div className="text-sm space-y-1.5 ">
                    <h2 className="text-2xl font-semibold">Furniture Mart</h2>
                    <div className="space-y-0.5" >
                        <p><span className="font-semibold">Corporate Office: </span> Plot-82, Block-C,</p>
                        <p>Zakir Hossain Raod, Khulshi, Chattogram-4225</p>
                        <p><span className="font-semibold">Factory: </span> Hill view, Panchalish, Chattogram</p>
                        <p><span className="font-semibold">Contact: </span> +88 01600 112233 | furni.mart@info.com</p>
                        <p><span className="font-semibold">Website: </span> <a href={"https://furni-mart.vercel.app"} target="_blank" >https://furni-mart.vercel.app</a> </p>
                    </div>
                </div>
                <div className="text-sm space-y-1.5 ">
                    <h3 className="text-xl font-semibold">Bill to:</h3>
                    <div className="space-y-0.5">
                        <p><span className="font-semibold">Name:</span> {cus_name}</p>
                        <p><span className="font-semibold">Email:</span> {cus_email}</p>
                        <p><span className="font-semibold">Phone:</span> {cus_phone}</p>
                        <p><span className="font-semibold">Address:</span> {cus_add1}, {cus_city}</p>
                        <p><span className="font-semibold">Date:</span> <DateFormatter date={invoiceDate} /> </p>
                    </div>
                </div>
            </div>
            <hr />
            <h4 className="mt-5 font-semibold " >Ordered Products:</h4>
            <ModularTable
                columns={columns}
                data={orderedProducts}
                showPagination={true}
                showSearchBar={false}
                filterPlaceholder="Search by name..."
            />


            <div className="text-right text-sm mt-3">
                <p> <span className="font-semibold">Discount:</span>  {discount_amount} Tk</p>
                <p> <span className="font-semibold">Payable:</span> {total_amount} Tk</p>
                <p> <span className="font-semibold"> Paid:</span> {total_amount} Tk</p>
            </div>

            <div className="flex items-end justify-between mt-6 text-sm w-full ">
                <div>
                    <strong>Thank you for choosing Furniture Mart!</strong>
                    <p>We appreciate your trust in us and hope you’re satisfied with your purchase.</p>
                    <p>For any questions or support, contact us at +88 01600 112233 or furni.mart@info.com</p>

                    <p>We look forward to serving you again!</p>

                    <p>Warm regards,</p>
                    <strong>Furniture Mart Team</strong>
                </div>
                <div>
                    <hr className="border border-black" />
                    <p>Cash Receiver</p>
                </div>
            </div>
        </div>
    );
};
export default OrderInvoice;