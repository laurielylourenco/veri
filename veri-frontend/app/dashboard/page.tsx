import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SurveyList } from "@/components/survey-list"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-6xl">
            <h1 className="mb-6 text-2xl font-bold">Pesquisas</h1>
            <SurveyList />
          </div>
        </main>
      </div>
    </div>
  )
}
