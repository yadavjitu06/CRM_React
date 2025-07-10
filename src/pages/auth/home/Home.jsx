import { BsFillPencilFill } from "react-icons/bs";
import Card from "../../../components/Card.Jsx";
import Homelayout from "../../../layouts/Homelayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTicketsforTheUser } from "../../../Redux/Slices/TicketSlice";

function Home() {
  const authState = useSelector((state) => state.auth);
  // const ticketState = useSelector((state) => state.tickets);
  const dispatch = useDispatch();
  async function loadTickets() {
    const responce = await dispatch(getAllTicketsforTheUser());

    console.log(responce);
  }

  useEffect(() => {
    loadTickets();
  }, [authState.token]);
  return (
    <Homelayout>
      <Card
        titleText="Open"
        status={30}
        // quantity=" "
        background="bg-yellow-300"
        borderColor="border-green-300"
        fontColor="text-black"
        dividerColor="bg-black"
      >
        <BsFillPencilFill className="inline mr-2" />
      </Card>
      {/* <Card
        titleText="Open"
        status={30}
        quantity={30}
        background="bg-yellow-300"
        borderColor="border-green-300"
        fontColor="text-black"
        dividerColor="bg-black"
      >
        <BsFillPencilFill className="inline mr-2" />
      </Card> */}
    </Homelayout>
  );
}
export default Home;
