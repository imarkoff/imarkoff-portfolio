import BackendImage from "@/lib/models/types/BackendImage";

export default interface ShowcaseImage extends BackendImage {
    id?: string;
    columnIndex: number;
    orderIndex: number;
}