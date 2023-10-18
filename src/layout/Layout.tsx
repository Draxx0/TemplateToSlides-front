const Layout = ({ children }: { children: React.ReactElement }) => {
 return (
  <>
   <header>
    HEADER
   </header>

   {children}
  </>
 );
}

export default Layout;