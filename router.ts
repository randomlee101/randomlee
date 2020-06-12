import {Router} from 'https://deno.land/x/oak/mod.ts'
import {allStories, oneStory, addStory, updateStory, deleteStory} from './story.ts'
import { oakCors } from 'https://deno.land/x/cors/mod.ts'

const router = new Router()

router.get("/", allStories )
.get("/:id", oneStory)
.post("/", addStory)
.put("/:id", updateStory)
.delete("/:id", deleteStory)

export default router