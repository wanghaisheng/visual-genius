import type { NextPage } from "next";
import dynamic from 'next/dynamic';
import { Card, CardBody, Image, Flex, Box, Text, useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import BasicImageModal from "./modalCard";

interface PhotoProps {
    item?: any;
    index?: any;
    imgPath: string;
}

const Draggable = dynamic(
    async () => {
        const mod = await import('react-beautiful-dnd');
        return mod.Draggable;
    },
    { ssr: false },
);


const PhotoCard: NextPage<PhotoProps> = ({ item, index, imgPath }) => {
    const showImgCaption = useSelector((state: any) => state.settings.showImgCaption);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {isOpen ?
                <>
                    <BasicImageModal title={item.title} imgPath={imgPath} isOpen={isOpen} onClose={onClose} />
                </>
                : null}
            {/* The draggableId should match the key of the component */}
            <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Card
                            maxW='sm'
                            style={{ margin: '3px' }}
                        >
                            <CardBody>
                                <Flex align="center">
                                    <Image
                                        src={imgPath ? imgPath : ""}
                                        borderRadius='lg'
                                        objectFit='cover'
                                        maxW={{ sm: '10vw' }}
                                        onClick={onOpen}
                                    />
                                </Flex>
                                {showImgCaption && <Text fontSize='sm' as='b'>{(item.title).includes('_gen_') ? (item.title).replace('_gen_', '(🎨)') : item.title}</Text>}
                            </CardBody>
                        </Card>
                    </div>
                )}
            </Draggable>
        </>
    )
}

export default PhotoCard;