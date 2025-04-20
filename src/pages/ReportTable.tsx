import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReportInfo } from "@/types/index";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";

const ReportTable: React.FC = () => {
  const [reports, setReports] = useState<ReportInfo[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const q = query(collection(db, "reports"), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);

        const reportsData: ReportInfo[] = [];

        for (const reportDoc of snapshot.docs) {
          const data = reportDoc.data();
          const report: ReportInfo = {
            id: reportDoc.id,
            animalType: data.animalType,
            condition: data.condition,
            description: data.description,
            location: data.location,
            photo: data.photo || null,
            timestamp: data.timestamp,
            user: {
              name: "",
              email: data.user.email,
              phone: "",
            },
          };

          const userQuery = query(
            collection(db, "users"),
            where("email", "==", data.user.email)
          );
          const userSnapshot = await getDocs(userQuery);
          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            report.user.name = userData.name || "Unknown";
            report.user.phone = userData.phone || "Unknown";
          }

          reportsData.push(report);
        }

        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const handleDeleteReport = async (reportId: string) => {
    try {
      const reportDocRef = doc(db, "reports", reportId);
      await deleteDoc(reportDocRef);
      setReports((prev) => prev.filter((report) => report.id !== reportId));

      toast({
        title: "Report deleted",
        description: "The report has been successfully removed.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error deleting report:", error);
      toast({
        title: "Error",
        description: "Something went wrong while deleting the report.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Reports</CardTitle>
        <CardDescription>Handle emergency animal reports</CardDescription>
      </CardHeader>
      <CardContent className="bg-dark-800">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-white">
            <thead>
              <tr className="bg-dark-700">
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Condition</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center p-4">
                    No reports available at the moment.
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report.id} className="border-b">
                    <td className="p-4">
                      {report.photo ? (
                        <img
                          src={report.photo}
                          alt="Report"
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <span className="text-muted-foreground">No Image</span>
                      )}
                    </td>
                    <td className="p-4">{report.user?.name || "Unknown"}</td>
                    <td className="p-4">
                      <a
                        href={`mailto:${report.user?.email}`}
                        className="text-blue-500"
                      >
                        {report.user?.email}
                      </a>
                    </td>
                    <td className="p-4">{report.location}</td>
                    <td className="p-4">{report.condition}</td>
                    <td className="p-4">{report.description}</td>
                    <td className="p-4">
                      {new Date(report.timestamp.seconds * 1000).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <Button
                        variant="destructive"
                        className="text-xs px-3 py-1 -ml-2"
                        onClick={() => handleDeleteReport(report.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportTable;
