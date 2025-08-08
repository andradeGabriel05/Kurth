import { useEffect, useState } from "react";
import * as Follow from "../../constants/follow";

export default function ProfileContentActions(userLoggedInId: string) {
  console.log(userLoggedInId);

  const [isFollowing, setIsFollowing] = useState(false);
  async function handleFollowOnSearchPage(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    console.log("Followed", userLoggedInId.userId);
    await Follow.followUser(
      userLoggedInId.userLoggedInId,
      userLoggedInId.userId
    )
      .then((response) => {
        console.log("Followed:", response.data);
        setIsFollowing(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    await Follow.increaseUserFollower(userLoggedInId.userId);
    await Follow.increaseUserFollowing(userLoggedInId.userLoggedInId);
  }

  async function handleUnfollowOnSearchPage(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    console.log("Unfollowed", userLoggedInId.userId);
    const response = await Follow.checkFollowStatus(
      userLoggedInId.userLoggedInId,
      userLoggedInId.userId
    );
    console.log(response);
    await Follow.decreaseUserFollower(userLoggedInId.userId);
    await Follow.decreaseUserFollowing(userLoggedInId.userLoggedInId);

    if (response.data.id) {
      await Follow.removeFollow(response.data.id);
    }

    setIsFollowing(false);
  }

  useEffect(() => {
    console.log(userLoggedInId);
    //userLoggedInId == eu
    //userId == usuário que está sendo seguido
    Follow.checkFollowStatus(
      userLoggedInId.userLoggedInId,
      userLoggedInId.userId
    )
      .then((response) => {
        console.log(response);
        setIsFollowing(response.status === 204 ? false : true);
        console.log(isFollowing);
      })
      .catch((error) => {
        setIsFollowing(false);
        console.log(isFollowing);
        console.error("Error:", error.response.data);
      });
  }, []);

  return (
    <div>
      {isFollowing ? (
        <form action="" onSubmit={handleUnfollowOnSearchPage}>
          <button id="buttonFollow" type="submit">
            Unfollow
          </button>
        </form>
      ) : (
        <form action="" onSubmit={handleFollowOnSearchPage}>
          <button id="buttonFollow" type="submit">
            Follow
          </button>
        </form>
      )}
    </div>
  );
}
