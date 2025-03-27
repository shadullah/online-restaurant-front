import Homepage from "@/Components/home/Homepage";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  // const router = useRouter();

  // useEffect(() => {
  // const url = window.location.href; // Get current URL

  //   if (url.includes("#access_token=")) {
  //     router.push("/");
  //   }
  // }, [router]);

  // if (url.includes("#access_token=")) redirect("/");
  const headersList = await headers();
  const fullUrl = headersList.get("referer") || "";

  if (fullUrl.includes("#access_token=")) redirect("/login");
  return (
    <div>
      <Homepage />
    </div>
  );
}
