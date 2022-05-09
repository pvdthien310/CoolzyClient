import { Stack, Typography } from "@mui/material";

const Footer = ({
  name,
  email,
  phone,
}) => {
  return (
    <>
      <footer style={{
        display: 'table-footer-group',
        borderWidth: '1px',
        borderColor: 'gray',
        marginLeft: '3rem',
        marginTop: '1rem'
      }}>
        <Stack direction="column" width="100%" spacing={2} style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
          <Stack width="100%" spacing={3} direction="row">
            <li style={{ fontFamily: 'serif', color: 'black' }} >
              <span style={{ fontWeight: 'bold', fontFamily: 'serif', color: 'black' }}>Name:</span> {name}
            </li>

            <li style={{ fontFamily: 'serif', color: 'black' }} >
              <span style={{ fontWeight: 'bold', fontFamily: 'serif', color: 'black' }}>Email:</span> {email}
            </li>
          </Stack>
          <Stack width="100%" spacing={3} direction="row">
            <li style={{ fontFamily: 'serif', color: 'black' }} >
              <span style={{ fontWeight: 'bold', fontFamily: 'serif', color: 'black' }}>Phone:</span> {phone}
            </li>
          </Stack>
          <div style={{ marginLeft: '2rem', marginRight: '2rem', height: '1px', backgroundColor: 'gray' }}></div>
          <Typography sx={{ fontSize: '13px', fontStyle: 'italic', color: 'gray' }}> * All products sold by Coolzy are subject to the manufacturer's and supplier's warranty conditions. If there is a problem with product quality, Coolzy is committed to supporting you to the end.</Typography>
          <Typography style={{ marginTop: '5%', fontFamily: 'serif', fontStyle: 'italic', color: 'gray' }}>** Thanks for supporting our store. We'll always welcome you to explore ❤️</Typography>
        </Stack>
      </footer>
    </>
  )
}
export default Footer