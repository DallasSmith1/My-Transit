function BottomNav()
{
    return (
        <nav className="navbar foxed-bottom navbar-dark bg-success" style={{position: "fixed", overflow: "hidden", bottom: 0,width: '100%', left: 0}}>
            <span className="navbar-text">
                My Transit
            </span>
        </nav>
    );
}

export default BottomNav;