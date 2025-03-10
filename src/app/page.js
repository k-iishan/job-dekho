import { fetchProfileAction } from "@/actions";
import Faq from "@/components/faq";
import Footer from "@/components/footer";
import AutoInfiniteCarousel from "@/components/";
import HomepageButtonControls from "@/components/homepage-button-controls";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Fragment } from "react";

async function Home() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) redirect("/onboard");

  return (<>
    <Fragment >
      <section className="relative w-full h-full min-h-screen pb-10 px-10">
        <div className="w-full h-full relative">
          <div className="flex flex-col-reverse lg:flex-row gap-10 mt-16">
            <section className="w-full lg:w-[50%] flex flex-col md:px-2 lg:px-0 p-5 lg:p-10">
              <div className="w-full flex justify-start flex-col h-auto lg:pt-7">
                <span className="flex space-x-2">
                  <span className="block w-14 mb-2 dark:border-white border-b-2 border-gray-700"></span>
                  <span className="font-medium dark:text-white text-gray-600">
                    One Stop Solution to Find Jobs
                  </span>
                </span>
                <h1 className="text-3xl dark:text-white mt-5 lg:text-7xl text-black font-extrabold">
                  Build your best job community starting from here.
                </h1>
                <div className="w-full mt-6 flex items-center text-white justify-start gap-2">
                  <HomepageButtonControls
                    user={JSON.parse(JSON.stringify(user))}
                    profileInfo={profileInfo}
                  />
                </div>
              </div>
            </section>
            <section className="relative w-full lg:w-[50%] flex items-center justify-end">
              <Image src="/front.jpg" height="500" width="1000" className="lg:py-10 my-8" />
            </section>
          </div>
        </div>
      </section>
    </Fragment>
    <AutoInfiniteCarousel/>
    <Faq/>
    <Footer/>
    </>

  );
}

export default Home;
