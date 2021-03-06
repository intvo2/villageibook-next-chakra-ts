import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Container,
  HStack,
  VStack,
  SimpleGrid,
  Divider,
  Flex,
  Box,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import SearchBar from "components/SearchBar";
import LeftVillageCard from "components/LeftVillageCard";
import UserCard from "components/UserCard";
import VillageGraduatesCountryStatCard from "components/VillageGraduatesCountryStatCard";
import ArticleCard from "components/ArticleCard";
import PersonalityCard from "components/PersonalityCard";
import InstitutionCard from "components/InstitutionCard";
import VideoCard from "components/VideoCard";
import FilterCard from "components/FilterCard";

import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";

const Posts: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid

  const { village, villageUsers, villageArticles, villagePersonalities, villageInstitutions, villageVideos, fetchVillagePageData } = useFetchData();

  const { fixed } = useWindowProp();

  useEffect(() => {
    if(vid){
      fetchVillagePageData({ uuid: vid });
    }
  }, [vid]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <Box px={{ lg: 20 }} my={{ base: 16, md: 8 }}>
          <SearchBar />
        </Box>

        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <LeftVillageCard village={village} fixed={fixed} />
              {/* <Text fontSize="24px" my={10}>
                Filters
              </Text>
              <Box bgColor="white" borderRadius="6px" px={4} py={8}>
                <FilterCard />
              </Box> */}
            </Box>
          )}

          <Box
            w="full"
            ml={
              fixed && breakpointValue === "md"
                ? "264px"
                : breakpointValue === "md"
                ? "24px"
                : "0px"
            }
          >
            {villageUsers.length > 0 && (
              <Box bgColor="white" p={6} mb={6}>
                <Text fontSize="14px">MY PAGES</Text>

                {breakpointValue === "md" && (
                  <VStack spacing={2} mt={6}>
                    {villageUsers.slice(0, 5).map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </VStack>
                )}
                {breakpointValue === "base" && (
                  <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} mt={6}>
                    {villageUsers.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </SimpleGrid>
                )}
                <Box>
                  <Link href="/village/users">
                    <Text
                      fontSize="12px"
                      color="purpleTone"
                      textAlign="center"
                      cursor="pointer"
                      mt={8}
                    >
                      SEE ALL MY PAGES ({villageUsers.length})
                    </Text>
                  </Link>
                </Box>
              </Box>
            )}

            <Box bgColor="white" p={6} mb={6}>
              <Text fontSize="14px">VILLAGE GRADUATES</Text>
              {/* <Divider mt={6} mb={8} /> */}
              <Box mt={4}>
                <VillageGraduatesCountryStatCard
                  village={village}
                  direction="row"
                />
              </Box>
            </Box>

            {villageArticles.length > 0 && (
              <Box bgColor="white" p={6} mb={6}>
                <Text fontSize="14px">SOCIETY</Text>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  columnGap={6}
                  rowGap={10}
                  mt={6}
                >
                  {villageArticles.slice(0, 2).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </SimpleGrid>
                <Divider my={6} />
                <Box>
                  <Link href="/village/society">
                    <Text
                      fontSize="12px"
                      color="purpleTone"
                      textAlign="center"
                      cursor="pointer"
                    >
                      SEE ALL ARTICLES ({villageArticles.length})
                    </Text>
                  </Link>
                </Box>
              </Box>
            )}

            {villagePersonalities.length > 0 && (
              <Box bgColor="white" p={6} mb={6}>
                <Text fontSize="14px">PERSONALITIES</Text>
                {breakpointValue === "md" && (
                  <VStack spacing={2} mt={6}>
                    {villagePersonalities.slice(0, 5).map((user) => (
                      <PersonalityCard key={user.id} user={user} />
                    ))}
                  </VStack>
                )}
                {breakpointValue === "base" && (
                  <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} mt={6}>
                    {villagePersonalities.map((user) => (
                      <PersonalityCard key={user.id} user={user} />
                    ))}
                  </SimpleGrid>
                )}
                <Box>
                  <Link href="/village/personalities">
                    <Text
                      fontSize="12px"
                      color="purpleTone"
                      textAlign="center"
                      cursor="pointer"
                      mt={8}
                    >
                      SEE ALL PERSONALITIES ({villagePersonalities.length})
                    </Text>
                  </Link>
                </Box>
              </Box>
            )}

            {villageInstitutions.length > 0 && (
              <Box bgColor="white" p={6} mb={6}>
                <Text fontSize="14px">INSTITUTIONS</Text>
                <VStack spacing={2} mt={6}>
                  {villageInstitutions.slice(0, 3).map((institution) => (
                    <InstitutionCard
                      key={institution.id}
                      institution={institution}
                    />
                  ))}
                </VStack>
                <Box>
                  <Link href="/village/institutions">
                    <Text
                      fontSize="12px"
                      color="purpleTone"
                      textAlign="center"
                      mt={8}
                      cursor="pointer"
                    >
                      SEE ALL INSTITUTIONS ({villageInstitutions.length})
                    </Text>
                  </Link>
                </Box>
              </Box>
            )}

            {villageVideos.length > 0 && (
              <Box bgColor="white" p={6} mb={6}>
                <Text fontSize="14px">VIDEOS</Text>
                <SimpleGrid
                  columns={{ base: 2, md: 3 }}
                  columnGap={4}
                  rowGap={10}
                  mt={6}
                >
                  {villageVideos.slice(0, 6).map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </SimpleGrid>
                <Divider mt={10} mb={6} />
                <Box>
                  <Link href="/village/videos">
                    <Text
                      fontSize="12px"
                      color="purpleTone"
                      textAlign="center"
                      cursor="pointer"
                    >
                      SEE ALL VIDEOS ({villageVideos.length})
                    </Text>
                  </Link>
                </Box>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>

      {/* <Box mt={20}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

export default Posts;
