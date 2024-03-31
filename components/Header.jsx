import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from '../AuthContext';

const Header = () => {
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
  };

  return (
    <nav>
       {!isLoggedIn && (
      <>
      <div className="left">
      <Link href="/" legacyBehavior>
          <a className="bold" >
           App
          </a>
        </Link>
       
      </div>
      <div className="right">
        <Link href="/signup" legacyBehavior>
          <a >Signup</a>
        </Link>
        <Link href="/login" legacyBehavior>
          <a >login</a>
        </Link>
        
      </div>

      </>
      )}
      {isLoggedIn && (
        <>
        <div className="left">
        <Link href="/" legacyBehavior>
            <a className="bold" >
             App
            </a>
          </Link>
         
        </div>
        <div className="right">
       
        <Link href="/" legacyBehavior>
        <a onClick={handleLogout} >logout</a>
      </Link>
         
        
        </div>
  
        </>
        )}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }

        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }

        .right {
          margin-left: auto;
        }

        .right a{
          border: 1px solid black;
          padding: 0.5rem 1rem;
          border-radius: 3px;
        }
      `}</style>
    </nav>
  );
}

export default Header
