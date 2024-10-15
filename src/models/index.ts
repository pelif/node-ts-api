import sequelize from './connection';

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso!');
        await sequelize.sync();
    } catch (error) {
        console.error('Erro ao estabelecer conexão:', error);
    }
};

export default connectDb;