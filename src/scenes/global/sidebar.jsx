import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { HomeOutlined } from "@mui/icons-material";
import { PeopleOutline,  LogoutTwoTone }from "@mui/icons-material";
import { ContactsOutlined } from "@mui/icons-material";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTrendUp, faTable, faCamera, faKey, faUser} from '@fortawesome/free-solid-svg-icons'
import React,  { useEffect, useState, useContext } from "react";
import axios from 'axios';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Link  to={to}>
      <MenuItem
       component="div"
        active={selected === title}
        style={{ color: colors.grey2[1000] }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        
        <Typography
          style={{ color: colors.grey2[1000], textDecoration: "none" }}
        >
          {title}
        </Typography>
      </MenuItem>
    </Link>
  );
};

const SidebarMain = (propsLogout) => {

    const [name, setName] = useState();
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePicture'));
  const [userId, setUserId] = useState();

  // const profilePics = ;
  function handeLogout(event) {
    // console.log("Asd");
    propsLogout.onLogout(false);
    
  }
  useEffect(() => {
  
    const fullName = localStorage.getItem('fullName');
    
    const userid = localStorage.getItem('userid');

    const modifiedProfilePics = profilePic.replace(/\\/g, '/').substring(6);

    console.log(modifiedProfilePics)
    setName(fullName);
    setUserId(userid)
    setProfilePic("http://192.168.60.53:3001"+ modifiedProfilePics);


   
  }, []);
  const [selectedImage, setSelectedImage] = useState();
  const [targetfiles, setTargetFiles] = useState(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // setTargetFiles(e.target.files[0])
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePic(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId);
    axios
      .post('/upload', formData)
      .then((response) => {

        console.log(response.data.filePath);
        const modifiedProfilePics3 = response.data.filePath;
        console.log(modifiedProfilePics3)
        localStorage.setItem('profilePicture',modifiedProfilePics3);
        const modifiedProfilePics4 = modifiedProfilePics3.replace(/\\/g, '/').substring(6);
        setProfilePic("http://192.168.60.53:3001"+ modifiedProfilePics4);
        console.log(response.data); // File is successfully uploaded and moved
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
    console.log('Upload the selected image:', profilePic);
  };

  // const handleImageUpload = (e) => {
  //   const file = targetfiles;
  //   const formData = new FormData();
  //   formData.append('image', file);
  
  //   axios
  //     .post('/upload', formData)
  //     .then((response) => {
  //       console.log(response.data); // File is successfully uploaded and moved
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading file:', error);
  //     });
  //   console.log('Upload the selected image:', selectedImage);
  // };


  // const {fullName} = localStorage.getItem('fullName');
  const location = useLocation();
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    if (location.pathname === "/") {
      setSelected("Dashboard");
    } else if (location.pathname === "/salaryincrease") {
      setSelected("Salary Increase");
    } else if (location.pathname === "/salaryTable") {
      setSelected("Salary Table");
    }else if (location.pathname === "/line") {
      setSelected("Line");
    }
  }, [location.pathname]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { toggleSidebar, broken, collapseSidebar, collapsed } = useProSidebar();
  // const [selected, setSelected] = useState("Dashboard");
  return (
    <Box
      sx={{
        "& .css-dip3t8": {
          background: `${colors.primary2[400]} !important`,
        },
        "& .ps-menu-button:hover": {
          background: "#868dfb !important",
          "& .ps-menu-label": {
            color: "#868dfb !important",
          },
        },
      }}
      style={{ display: "flex", height: "100%" }}
    >
     <Sidebar   customBreakPoint="800px"  image="../../assets/backgroundsidebar.png"
     >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "#f5d9ff" : "#d359ff",
                  background: active ? colors.gradient : undefined,
                };
            },
          }}
          iconShape="square"
        >
          {/* LOGO AND MENU ICON */}
          <Box
            // onClick={() =>  toggleSidebar()}
            // icon={broken ? <MenuOutlined/>:undefined}
            style={{
              margin: "20px 0 20px 0",
              color: colors.grey2[1000],
            }}
          >
            {!collapsed ? (
              <Box
                display="flex"
                // justifyContent="space-between"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="h3" color={colors.grey2[1000]}>
                  HR Information Sys.
                </Typography>
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                ml="15px"
                padding="10px"
              >
                <Typography variant="h3" color={colors.grey2[1000]}>
                  HRIS
                </Typography>
              </Box>
            )}
          </Box>

          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <div
                //   src={`../../assets/5R (3).JPG`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: `${collapsed ? "50px" : "100px"}`,
                  height: `${collapsed ? "50px" : "100px"}`,
                  cursor: "pointer",
                  borderRadius: "50%",
                  backgroundSize: "cover",
                  backgroundClip: "content-box",
                  boxSizing: "border-box",
                  backgroundImage: `url('${profilePic}')`,
                  position:"relative",
                  overflow: "hidden"
                  
                }}
              >
                <div className="blueBackground">
                <input type="file" className="editProfile"accept="image/*" onChange={handleImageChange}/>
                <FontAwesomeIcon className="profilepic__icon" style={{
                  margin: "auto", color: "white"
                }} icon={faCamera} size="3x"/>
                </div>
               
              </div>
            </Box>
            {!collapsed ? (
            <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey2[1000]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent2[300]}>
                 Administration
                </Typography>
              </Box>
            ):( <Box textAlign="center">
            <Typography
              variant="h2"
              color={colors.grey2[1000]}
              fontWeight="bold"
              sx={{ m: "10px 0 0 0" }}
            >
              
            </Typography>
            <Typography variant="h5" color={colors.greenAccent2[300]}>
       
            </Typography>
          </Box>)}
          </Box>

          <div style={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
  <Box paddingLeft={broken ? undefined : "10%"} color={colors.grey2[1000]}>
    <Item
      title="Salary Increase"
      to="/salaryincrease"
      icon={<FontAwesomeIcon icon={faMoneyBillTrendUp} size="lg" />}
      selected={selected}
      setSelected={setSelected}
      color={colors.grey2[1000]}
    />
    <Item
      title="Salary Table"
      to="/salaryTable"
      icon={<FontAwesomeIcon icon={faTable} size="lg" />}
      selected={selected}
      setSelected={setSelected}
      color={colors.grey2[1000]}
    />
    <Item
      title="Grades Record"
      to="/gradesRecord"
      icon={<FontAwesomeIcon icon={faKey} size="lg" />}
      selected={selected}
      setSelected={setSelected}
      color={colors.grey2[1000]}
    />
        <Item
      title="Users"
      to="/users"
      icon={<FontAwesomeIcon icon={faUser} size="lg" />}
      selected={selected}
      setSelected={setSelected}
      color={colors.grey2[1000]}
    />
    
    {/* Other menu items go here */}
  </Box>

  <div style={{ marginTop: 'auto' }}>
  <Box paddingLeft={broken ? undefined : "10%"} color={colors.grey2[1000]}>
    <Link to={"/login"}>
      <Item
        title="Logout"
        to="/login"
        icon={<LogoutTwoTone />}
        selected={selected}
        setSelected={handeLogout}
        onClick={handeLogout}
        color={colors.grey2[1000]}
      />
    </Link>
    </Box>
  </div>
</div>

        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarMain;
