import TopCardsOverview from "@/components/dashboard/admin/overview/TopCardsOverview"
import ProductInventory from "@/components/dashboard/admin/overview/ProductInventory"

const AdminDashboardOverviewPage = () => {


  return (
    <div className="w-full p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
      <main className="-2 w-full col-span-12 lg:col-span-8 ">
      <TopCardsOverview  />

      </main>

      <aside  className="w-full col-span-12 lg:col-span-4">
        <ProductInventory />

      </aside>
    </div>
  )
}
export default AdminDashboardOverviewPage