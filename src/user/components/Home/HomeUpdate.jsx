import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

export default function HomeUpdate({ imagesUrl, title, desc}) {
    return (
        <Card sx={{ maxWidth: 330, borderRadius: "12px" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={imagesUrl}
                    alt="feature images"
                />
                <CardContent sx={{padding: "20px"}}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{color: "#505050"}}>
                        {desc}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{padding: "20px", paddingTop: "5px"}}>
                <Button size="small" color="primary" variant="contained" sx={{borderRadius: "9999px", paddingX: "20px", paddingY: "8px"}}>
                    Learn more
                </Button>
            </CardActions>
        </Card>
    )
}