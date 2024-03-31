import Header from './Header'

type Props = {
  children: React.ReactNode
}
const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="layout">{props.children}</div>
    
    <style jsx global>{`
      html {
        box-sizing: border-box;
      }

      

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';
        background: rgba(0, 0, 0, 0.05);
      }

      input,
      textarea {
        font-size: 16px;
        width:100%
      }

      button {
        cursor: pointer;
      }

      form{
        width:100%
      }

      input[type="text"] {
        width: 100%;
        padding: 0.5rem;
        margin: 0.5rem 0;
        border-radius: 0.25rem;
        border: 0.125rem solid rgba(0, 0, 0, 0.2);
      }

      input[type="submit"] {
        background: #ececec;
        border: 0;
        padding: 1rem 2rem;
      }

      button[type:"submit"]{
        background: #ececec;
        border: 0;
        padding: 1rem 2rem;
      }
    `}</style>
    <style jsx>{`
      .layout {
        padding: 0 2rem;
      }
    `}</style>
  </div>
)

export default Layout
