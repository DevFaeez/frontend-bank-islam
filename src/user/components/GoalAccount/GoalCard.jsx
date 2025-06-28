import { Box, Button, Card, LinearProgress, Typography } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export default function GoalCard() {
    const [bgImages, setBgImages] = useState("https://media.cnn.com/api/v1/images/stellar/prod/180219103122-zanzibar-and-its-islands-mnemba-a-view-from-the-sky-mnemba-island-lodge.jpg?q=w_1600,h_900,x_0,y_0,c_fill");
    return (
        <div>
            <Box
                sx={{
                    position: "relative",
                    "&:hover .card-actions": {
                        opacity: 1,
                        transform: "translateY(0)",
                    },
                }}
            >
                <Card
                    sx={{
                        width: "9.5cm",
                        height: "5.7cm",
                        borderRadius: "15px",
                        boxShadow: 4,
                        position: "relative",
                        overflow: "hidden",
                    }}
                    className="flex flex-col justify-between px-8 py-6"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${bgImages})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            zIndex: 0,
                        }}
                    />

                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            zIndex: 1,
                        }}
                    />

                    <Box sx={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                        <div className="flex justify-end items-center">
                            <div className="w-[80%]">
                                <Typography sx={{ fontWeight: "bold" }} variant="h5" color="white">Travel Jepun</Typography>
                            </div>
                            <div className="">
                                <div className="flex justify-between">
                                    <Typography sx={{ fontWeight: "bold" }} variant="body2" color="white">Date: 12/12/26</Typography>
                                    <Typography sx={{ fontWeight: "bold", textAlign: "right" }} variant="body2" color="white">RM 300 / 3000</Typography>
                                </div>
                                <div>
                                    <Box
                                        sx={{
                                            position: "relative",
                                            width: "100%",
                                        }}
                                    >
                                        <LinearProgress
                                            variant="determinate"
                                            value={80}
                                            sx={{
                                                height: 20,
                                                borderRadius: 4,
                                                backgroundColor: "#ddd",
                                                "& .MuiLinearProgress-bar": {
                                                    backgroundColor: "#0BDA51",
                                                    borderRadius: 2,
                                                },
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                height: "100%",
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "white",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {10}%
                                            </Typography>
                                        </Box>
                                    </Box>
                                </div>
                            </div>
                        </div>

                    </Box>
                    <Box
                        className="card-actions"
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: "40%",
                            backgroundColor: "rgba(17, 17, 17, 0.69)",
                            zIndex: 3,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                            opacity: 0,
                            transform: "translateY(20px)",
                            transition: "opacity 0.3s ease, transform 0.3s ease",
                        }}
                    >
                        <Button variant="contained" sx={{backgroundColor: "#0BDA51"}}>Add Amount</Button>
                        <Button variant="outlined"><DeleteIcon /></Button>
                    </Box>
                </Card>
            </Box>
        </div>
    )
}