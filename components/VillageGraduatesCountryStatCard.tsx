import { Fragment, useEffect } from "react";
import {
  Stack,
  StackDirection,
  HStack,
  VStack,
  Divider,
  Flex,
  Text,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";

import {Village} from "types/schema";
import GraduatePercent from "./GraduatePercent";
import { platformCountries, homeCountry, watchCountries } from "constants/global";
const totalGraduatesCount = 1000;

const VillageGraduatesCountryStatCard: React.FC<{
  village: Village;
  direction: string;
}> = ({ village, direction }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const {villageGraduates, fetchCountriesData} = useFetchData();
  
  useEffect(() => {
    fetchCountriesData();
  }, []);

  const maxRowsPerCol = Math.floor(
    watchCountries.length / 2 + (watchCountries.length % 2)
  );

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <Stack
          direction={direction as StackDirection}
          spacing={direction === "row" ? 12 : 6}
          align="start"
          bgColor="white"
          border="1px"
          borderRadius="8px"
          borderColor="gray.200"
          p={4}
        >
          <GraduatePercent
            village={village}
            totalCount={totalGraduatesCount}
            graduatesCount={villageGraduates.length}
          />

          {direction === "column" && (
            <VStack w="full" divider={<Divider />}>
              {watchCountries.map((country, index) => (
                <CountryBox
                  key={country.id}
                  country={country}
                  count={0
                    // villageGraduates.filter(
                    //   (user) => user.graduatedAt.uuid === country.href
                    // ).length
                  }
                />
              ))}
            </VStack>
          )}

          {direction === "row" && (
            <>
              <VStack w="full" divider={<Divider />}>
                {watchCountries.map((country, index) => {
                  if (index >= maxRowsPerCol) return null;
                  return (
                    <CountryBox
                      key={country.id}
                      country={country}
                      count={0
                        // villageGraduates.filter(
                        //   (user) => user.graduatedAt === country.href
                        // ).length
                      }
                    />
                  );
                })}
              </VStack>
              <VStack w="full" divider={<Divider />}>
                {watchCountries.map((country, index) => {
                  if (index < maxRowsPerCol) return null;
                  return (
                    <CountryBox
                      key={country.id}
                      country={country}
                      count={0
                        // villageGraduates.filter(
                        //   (user) => user.graduatedAt === country.href
                        // ).length
                      }
                    />
                  );
                })}
              </VStack>
            </>
          )}
        </Stack>
      )}

      {breakpointValue === "base" && (
        <VStack
          spacing={8}
          bgColor="white"
          border="1px"
          borderRadius="8px"
          borderColor="gray.200"
          p={4}
        >
          <GraduatePercent
            village={village}
            totalCount={totalGraduatesCount}
            graduatesCount={villageGraduates.length}
          />
          <VStack w="full" divider={<Divider />}>
            {watchCountries.map((country, index) => (
              <CountryBox
                key={country.id}
                country={country}
                count={0
                  // villageGraduates.filter(
                  //   (user) => user.graduatedAt === country.href
                  // ).length
                }
              />
            ))}
          </VStack>
        </VStack>
      )}
    </Fragment>
  );
};

import { Country } from "types/schema";
import useFetchData from "hooks/use-fetch-data";

const CountryBox: React.FC<{ country: Country; count: number }> = ({
  country,
  count,
}) => {
  return (
    <Flex w="full" justifyContent="space-between" alignItems="center">
      <Text fontSize="12px" textTransform="capitalize">
        {country.name}
      </Text>
      <Capsule count={count} flag={country.name === homeCountry.name ? "home" : "oversea"} />
    </Flex>
  );
};

const Capsule: React.FC<{ count: number, flag: string }> = ({ count, flag }) => {
  return (
    <Fragment>
      <Flex>
        <HStack
          w="50px"
          borderRadius="25px"
          border="1px"
          borderColor="gray.300"
          px={2}
        >
          <Image src={`/icons/graduate-${flag}.svg`} alt="" />
          <Text fontSize="10px" lineHeight={2}>
            {count}
          </Text>
        </HStack>
      </Flex>
    </Fragment>
  );
};

export default VillageGraduatesCountryStatCard;
