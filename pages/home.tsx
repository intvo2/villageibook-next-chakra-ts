import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";

import {
  Container,
  Flex,
  Box,
  Text,
  Stack,
  HStack,
  Image,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import Slider from "react-slick";

import Logo from "components/Logo";
import Footer from "components/Footer";

import HomeSlick from "components/HomeSlick";
import HomeSlickControl from "components/HomeSlickControl";
import HomeCategoryBar from "components/HomeCategoryBar";
import VideoBox from "components/widgets/VideoBox";
import router from "next/router";

const Home: NextPage = () => {
  const breakpointValue = useBreakpointValue({
    base: "base",
    md: "md",
  });

  const heroImgSlideConf = {
    dots: false,
    arrows: false,
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [sliderIndex1, setSliderIndex1] = useState(0);
  const [sliderIndex2, setSliderIndex2] = useState(0);

  return (
    <Fragment>
      <Box bgColor="white">
        <Flex
          w="full"
          h="55px"
          bgColor="white"
          justifyContent="space-between"
          alignItems="center"
          px={6}
        >
          <Logo />
          <HStack spacing={8}>
            <Box fontSize="14px">
              <Link href="/login">Login</Link>
            </Box>
            <Box
              px={4}
              h="24px"
              textAlign="center"
              color="purpleTone"
              fontSize="14px"
              border="1px"
              borderColor="purpleTone"
              borderRadius="6px"
              cursor="pointer"
            >
              <Link href="/signup">Create Account</Link>
            </Box>
          </HStack>
        </Flex>

        <Box px={{ base: 6, md: 32 }} mt={12}>
          <Stack spacing={12} direction={{ base: "column", md: "row" }}>
            <Box w="full">
              <Text
                textAlign={{ base: "center", md: "left" }}
                fontSize="3xl"
                fontWeight="600"
                color="purpleTone"
                lineHeight={1.2}
              >
                Welcome to Bangladesh Community
              </Text>
              <Text
                textAlign={{ base: "center", md: "left" }}
                fontSize="md"
                color="GrayText"
                mt={8}
              >
                Connecting village community, Know your people, culture and
                history
              </Text>
              <Text
                textAlign={{ base: "center", md: "left" }}
                fontSize="xs"
                color="GrayText"
                mt={12}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                auctor euismod lobortis. Mauris ornare ante non justo mattis,
                vitae fermentum ligula consequat. Donec ac quam sit amet libero.
                Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante
                mauris, non elementum purus luctus sit amet. Nullam sed elit
                lectus.
              </Text>
              {breakpointValue === "md" && (
                <HStack spacing={4} mt={24}>
                  <Button onClick={() => router.push("/login")}>
                    Get Started
                  </Button>
                  <Button onClick={() => router.push("/signup")}>
                    Join Community
                  </Button>
                </HStack>
              )}
            </Box>
            <Box w={{ base: "100%", md: "50%" }}>
              <Slider {...heroImgSlideConf}>
                {[1, 2, 3, 4].map((number) => (
                  <Box key={number} index={number}>
                    <Image
                      src={`/images/home/hero-img${number}.png`}
                      alt=""
                      w="full"
                      objectFit="cover"
                    />
                  </Box>
                ))}
              </Slider>
            </Box>
          </Stack>
        </Box>

        <Box
          bgColor="#FAFAFA"
          px={{ base: 6, md: 32 }}
          py={12}
          mt={{ base: 12, md: 8, lg: -20 }}
        >
          <HomeSlick
            sliderIndex={sliderIndex1}
            styles={{ titleColor: "primary", descColor: "#8E8E8A" }}
          />
          <HomeSlickControl
            sliderIndex={sliderIndex1}
            setSliderIndex={setSliderIndex1}
            styles={{
              btnColor: "gray.400",
              btnActiveColor: "primary",
              dotColor: "gray.400",
              dotActiveColor: "purpleTone",
            }}
          />
        </Box>

        <Flex pos="relative" alignItems="center" overflow="hidden">
          <Image src="/images/home/middle-bar-back.png" w="full" fit="cover" />
          <HStack
            spacing={6}
            w="full"
            h="80%"
            pos="absolute"
            px={{ base: 6, md: 32 }}
          >
            <Box w="30%" h="full">
              <Image
                src="/images/home/bar-avatar1.png"
                borderRadius="full"
                h="full"
                fit="cover"
              />
            </Box>
            <Box w="70%">
              <HomeSlick
                sliderIndex={sliderIndex2}
                styles={{ titleColor: "white", descColor: "gray.300" }}
              />
              <HomeSlickControl
                sliderIndex={sliderIndex2}
                setSliderIndex={setSliderIndex2}
                styles={{
                  btnColor: "gray.400",
                  btnActiveColor: "white",
                  dotColor: "gray.400",
                  dotActiveColor: "white",
                }}
              />
            </Box>
          </HStack>
        </Flex>

        <Box px={{ base: 6, md: 36 }} pt={12}>
          <HomeCategoryBar />
        </Box>

        <Container maxW="container.md" mt={24}>
          <VideoBox videoUrl="https://dms.licdn.com/playlist/C4E05AQHku83iVu0opQ/mp4-720p-30fp-crf28/0/1634735737014?e=1634907600&v=beta&t=kaOqes8UxaDsNDFbWAgC3_3yl9fHsNOqVMdSxwwwHsQ" />
        </Container>

        <Box mt={-96}>
          <Image src="/images/home/bottom-back.png" w="full" fit="cover" />
        </Box>

        <Box>
          <Footer />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Home;
