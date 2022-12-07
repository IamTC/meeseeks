import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

export default function Home({ artists }) {
  const { user, isLoading } = useMe();

  return (
    <GradientLayout
      color={'red'}
      subtitle='profile'
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistCount} Playlists`}
      image={'/images/SAVE_20200203_054001.jpg'}
      roundImage={true}
    >
      <Box paddingX='40px' color='white'>
        <Box marginBottom='40px'>
          <Text fontSize='2xl' fontWeight='bold'>Top artists this month</Text>
          <Text fontSize='medium'>Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map(art =>
          (
            <Box paddingX='10px' width='20%'>
              <Box bg='gray.900' borderRadius='4px' padding='15px' width='100%'>
                <Image src="http://placekitten.com/300/300" borderRadius='100%'></Image>

                <Box marginTop='20px'>
                  <Text fontSize='large'>{art.name}</Text>
                  <Text fontSize='smaller'>Artist</Text>
                </Box>
              </Box>
            </Box>
          )
          )}
        </Flex>
      </Box>
    </GradientLayout>
  );
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  }
}