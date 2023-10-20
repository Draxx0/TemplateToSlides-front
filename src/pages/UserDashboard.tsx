import { Box, Card, CardBody, CardHeader, Skeleton, Stack, Table, Text, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import UserService from "../services/user.service";
import { DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import useGetUserPresentations from "../hooks/useGetUserPresentations";
import { Link } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";
import TemplateCode from "../components/TemplateCode";
import { Presentation } from "../types/presentation";

const UserDashboard = () => {
  const user = UserService.getUserFromLocalStorage();
  const toast = useToast()
  const { data: presentations, isLoading } = useGetUserPresentations(user && user.id || "")


  const handleDownloadPresentation = (presentation: Presentation) => {
    const htmlContent = `
  <!DOCTYPE html>
   <html lang="en">
     <head>
     <link
     rel="stylesheet"
     href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.6.1/reveal.min.css"
    />
    <link
     rel="stylesheet"
     href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.6.1/theme/solarized.min.css"
    />
    <link
     rel="stylesheet"
     href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.6.1/plugin/highlight/monokai.min.css"
    />
     </head>
        <body>
          ${renderToStaticMarkup(<TemplateCode presentationCode={presentation.presentationCode} />)}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.6.1/reveal.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.6.1/plugin/highlight/highlight.min.js"></script>
          <script>
            Reveal.initialize({
              plugins: [RevealHighlight],
            });
          </script>
        </body>   
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${presentation.presentationName}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Présentation crée",
      description: `La présentation : ${presentation.presentationName} a bien était crée`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }
  return (
    <>
      <Box
        position={"absolute"} inset={0} zIndex={0} backgroundImage={`url('./assets/bg.jpg')`} backgroundPosition={"center"} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}
      ></Box>
      <Box position={"absolute"} inset={0} opacity={0.3} w={"100%"} h={"100%"} backgroundColor={"black"} zIndex={1}></Box>
      <Card className="w-[60%] z-10">
        <CardHeader className="text-center flex flex-col gap-3">
          <Text>👋 Bienvenue sur votre dashboard <Box as="span" className="capitalize">{user?.username}</Box></Text>

          <Text className="font-bold">Dashboard Utilisateur</Text>
        </CardHeader>

        <CardBody>
          {isLoading ? (
            <Stack>
              <Skeleton height={10} />
              <Skeleton height={200} />
            </Stack>
          ) : (
            <TableContainer>
              <Table variant='striped' colorScheme='blue'>
                {presentations && presentations.length > 0 ? (
                  <>
                    <TableCaption>Vos présentations générées</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Nom de la présentations</Th>
                        <Th>Date de création</Th>
                        <Th className="flex justify-end">Téléchargé</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {presentations.reverse().map((presentation) => (
                        <Tr key={presentation.id}>
                          <Td>{presentation.presentationName}</Td>
                          <Td>{presentation.createdAt}</Td>
                          <Td className="cursor-pointer" onClick={() => handleDownloadPresentation(presentation)}>
                            <DownloadIcon />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </>
                ) : (
                  <Link to={"/app"} className="hover:underline justify-center flex items-center gap-3">
                    Vous n'avez encore générées aucune présentations
                    <ExternalLinkIcon />
                  </Link>
                )}
              </Table>
            </TableContainer >
          )}
        </CardBody >
      </Card >
    </>
  );
}

export default UserDashboard;