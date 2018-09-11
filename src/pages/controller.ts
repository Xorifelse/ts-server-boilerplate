import { JsonController, Get, Put, Post, Param, Body, HttpCode, NotFoundError, Authorized } from 'routing-controllers'
import Page from './entity'


@JsonController()
export default class PageController {

  @Get('/pages/:id')
  getPage(
    @Param('id') id: number
  ) {
    return Page.findOne(id)
  }

  @Get('/pages')
  allPages() {
    return Page.find()
  }

  @Authorized()
  @Put('/pages/:id')
  @HttpCode(201)
  async updatePage(
      @Param('id') id: number,
      @Body() update: Partial<Page>
  ) {
      const page = await Page.findOne(id)

      if (!page){
        throw new NotFoundError('Page does not exist')
      }

      return Page.merge(page, update).save()
  }

  @Authorized()
  @Post('/pages')
  @HttpCode(201)
  createPage(
    @Body() page: Page
  ) {
    return page.save()
  }
}