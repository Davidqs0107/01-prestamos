import { BadGatewayException, BadRequestException, Logger } from "@nestjs/common"

export class CommonService {
    private logger = new Logger();
    handleError(error: any) {
        this.logger.error(error);
        console.log(error);
        if (error.code === '23505') {
        }
        switch (error.code) {
            case '23505':
                throw new BadRequestException(error.detail);
            case '23503':
                throw new BadGatewayException(error.detail);

        }
        throw new BadGatewayException('Check logs');
    }
}