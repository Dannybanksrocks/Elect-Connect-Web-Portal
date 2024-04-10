import signal from "../services/Signal";
import { atom, useAtom } from "jotai";

const votesByCountyAtom = atom(null);
const votesDetailsAtom = atom(null);

const useVotes = () => {
  const [votesDetails, setVotesDetails] = useAtom(votesDetailsAtom);
  const [votesByCounty, setVotesByCounty] = useAtom(votesByCountyAtom);
  signal.on("getoverallvotingdetails", (data) => {
    data && data.length > 0 && setVotesDetails(data);
  });
  signal.on("getoverallresultsdetailsbycounty", (data) => {
    data && data.length > 0 && setVotesByCounty(data);
  });
  return { votesByCounty, votesDetails };
};

export default useVotes;
