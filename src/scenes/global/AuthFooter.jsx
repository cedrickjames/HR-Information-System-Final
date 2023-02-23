// material-ui
import { useMediaQuery, Container, Link, Typography, Stack , useTheme} from '@mui/material';
import { ColorModeContext, tokens} from "../../theme";
import { useContext } from "react";
// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const toggleColorModea = () => {
        colorMode.toggleColorMode();

      };

 
    return (
        <Container maxWidth="xl">
            <Stack
                direction={matchDownSM ? 'column' : 'row'}
                justifyContent={matchDownSM ? 'center' : 'space-between'}
                spacing={2}
                textAlign={matchDownSM ? 'center' : 'inherit'}
            >
                <Typography variant="subtitle2" component="span">
                <Typography component="span"  color="#0288d1" variant="subtitle2" >
                &copy; Human Resource Information System by&nbsp;
                    </Typography>
                    
                    <Typography component="span" variant="subtitle2" >
                        Cedrick James Orozo
                    </Typography>
                </Typography>
               
                <Stack
                    direction={matchDownSM ? 'column' : 'row'}
                    spacing={matchDownSM ? 1 : 3}
                    textAlign={matchDownSM ? 'center' : 'inherit'}
                >
                    <Typography
                        variant="subtitle2"
                        color="#0288d1"
                        // component={Link}
                        // href="https://material-ui.com/store/contributors/codedthemes/"
                        target="_blank"
                        underline="hover"
                    >
                        MIS Section
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color="#0288d1"
                        component={Link}
                        href="https://codedthemes.com"
                        target="_blank"
                        underline="hover"
                    >
                        Privacy Policy
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color="#0288d1"
                        component={Link}
                        href="https://codedthemes.support-hub.io/"
                        target="_blank"
                        underline="hover"
                    >
                        Support
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    );
};

export default AuthFooter;
