import { FaEnvelope } from "react-icons/fa6";

export default function ProfileContentActions() {
  return (
    <div className="profile-content-actions">
      <form action="" method="post">
        <button>Follow</button>
        <button>
          <FaEnvelope className="reactIcon" />
        </button>
      </form>
    </div>
  );
}
