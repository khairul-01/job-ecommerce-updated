import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../hooks/UseAxiosPublic";
import Banner from "./Banner";
import OurServices from "./OurServices";
import BrowseByCategory from "./BrowseByCategory";


const Home = () => {

    const axiosPublic = UseAxiosPublic();

    const {  data: jobs = [] } = useQuery({
        queryKey: ["jobs"],
        queryFn: async () => {
            const res = await axiosPublic.get('/jobs');
            return res.data;
        }
    })

    console.log(jobs)

    return (
        <div>
            <Banner></Banner>
            <BrowseByCategory></BrowseByCategory>
            <OurServices></OurServices>
        </div>
    );
};

export default Home;