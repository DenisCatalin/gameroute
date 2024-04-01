"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import CounterStrikeHomepage from "../components/CounterStrikeHomepage";
import { acceptedRouteGames } from "../utils/constants";
import useSnackbar from "../hooks/useSnackbar";
import { useDispatch } from "react-redux";
import { setAppCurrentGame } from "../redux/app.slice";
import GTAHomepage from "../components/GTAHomepage";

const GamePage = () => {
  const params = useParams<{ game: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (!acceptedRouteGames.includes(params.game)) {
      router.push("/");
      if (params.game !== "dashboard") {
        showSnackbar(
          "Error",
          "This is not a valid route for any registered game. You have been redirected to the homepage"
        );
      }
    } else {
      dispatch(setAppCurrentGame(params.game));
    }
  }, []);

  return (
    <div className="mt-4">
      {params.game === "cs" && <CounterStrikeHomepage />}
      {params.game === "gta" && <GTAHomepage />}
    </div>
  );
};

export default GamePage;
