import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDTO, UpdateOrderDTO } from 'src/app/dto';
import { OrderService } from 'src/app/service';

/**
 * Controller for handling HTTP requests related to orders.
 */
@Controller('orders') // Define the base route for the order controller
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Creates a new order for the current merchant.
   * @param dto - CreateOrderDTO containing order details.
   * @returns The newly created order.
   */
  @Post()
  create(@Body() dto: CreateOrderDTO) {
    return this.orderService.create(dto); // Call the service to create the order
  }

  /**
   * Retrieves all orders for the current merchant.
   * @returns List of orders.
   */
  @Get()
  findAll() {
    return this.orderService.findAll(); // Call the service to fetch all orders
  }

  /**
   * Retrieves a specific order by its ID.
   * @param id - ID of the order to fetch.
   * @returns The order with the specified ID.
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.orderService.findOne(id); // Call the service to fetch a specific order
  }

  /**
   * Updates an order for the current merchant.
   * @param id - ID of the order to update.
   * @param dto - Updated order data.
   * @returns The updated order.
   */
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateOrderDTO) {
    return this.orderService.update(id, dto); // Call the service to update the order
  }

  /**
   * Deletes an order for the current merchant.
   * @param id - ID of the order to delete.
   * @returns The deleted order.
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderService.remove(id); // Call the service to delete the order
  }
}
