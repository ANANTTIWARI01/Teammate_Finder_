import { Link } from 'react-router-dom';
import { useUserData } from '../context/UserData';

function UserAvailable() {
  const { toggle, availableUser } = useUserData()
  return (
    <>
      <div>
        <div className="md:w-1/3 my-8 md:mb-0 md:pr-4">
          {toggle ? <>
            {availableUser.map((obj, index) => (
              <div key={index} className="bg-green-500 text-white rounded-md p-4 shadow-md sticky top-20">
                <Link key={obj._id} to={`/${obj.name}`}>
                  <img
                    src={obj.image}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                    key={obj.image}
                  />
                  <h2 key={obj.name}>
                    <strong >Name:</strong> {obj.name}
                  </h2>
                  <p key={obj.address}>
                    <strong>Address:</strong> {obj.address}
                  </p>
                  <p key={obj.mode}>
                    <strong>Mode:</strong> {obj.mode}
                  </p>
                </Link>
              </div>
            ))}
          </>
            :
            (
              <div>
                <h1>User Not Available ...</h1>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default UserAvailable
