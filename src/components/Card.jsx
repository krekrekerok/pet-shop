import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Truncate from 'react-truncate'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import StarIcon from '@material-ui/icons/Star';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { clientContext } from '../context/ClientContext';

const useStyles = makeStyles({
  root: {
    maxWidth: 230,
    minWidth: 210,
    margin: "0 10px 10px 10px",
    width: 250,
    height: 310,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  media: {
    height: 130,
    backgroundSize: "cover",
    backgroundColor: "#bbaa90"
  }
});

export default function MediaCard({item}) {
  const classes = useStyles();
  const {toggleCartIcon, checkPetInCart, toggleStarIcon, checkPetInFavorites} = useContext(clientContext)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.photo}
          title={item.title}
        />
        <CardContent>
            <Typography noWrap  variant="h5" component="h2">
                {item.breed}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                <Truncate 
                    lines = {1}
                    ellipsis = {<span>...<a href = "/">Далее</a></span>} >
                    {item.description}
                </Truncate>
            </Typography>
            <Typography variant = "h6" component = "h1">
                Цена {item.price} сом
            </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions className="card-btn">
            <Button 
              size="small" 
              color="primary"
              onClick={() => toggleCartIcon(item)}>
            <ShoppingCartIcon
              color = {checkPetInCart(item.id) ? "secondary" : "primary"}/>
            </Button>

            <Button 
              size="small" 
              color="primary"
              onClick={
                ()=> {toggleStarIcon(item)
                console.log("click on button",item)}
                }>
            <StarIcon
              color = {checkPetInFavorites(item.id) ? "secondary" : "primary"}/>
            </Button>
{/* 
            <Button size="small" color="primary">
            <ChatBubbleOutlineIcon/>
            </Button> */}
      </CardActions>
    </Card>
  );
}
